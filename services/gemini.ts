import { GoogleGenAI, Type } from '@google/genai';
import { Character } from '../types';

export async function evaluateCharacter(answers: Record<number, string>): Promise<Character> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    你是一位精通《红楼梦》的文学大师。用户刚刚完成了一个性格测试，以下是他们的选择偏好：
    ${JSON.stringify(answers)}
    
    请根据这些选择，从《红楼梦》金陵十二钗（如林黛玉、薛宝钗、王熙凤、史湘云等）中，
    挑选一位最符合用户性格的角色。
    
    请返回 JSON 格式的数据，包含以下字段：
    - name: 角色名称（如：林黛玉）
    - poem: 该角色的经典判词（如：可叹停机德，堪怜咏絮才。玉带林中挂，金簪雪里埋。）
    - tags: 3-4个描述该角色性格的四字词语（如：["多愁善感", "孤高自许", "咏絮之才"]）
    - description: 一段约100字的解析，说明为什么用户像这个角色，语气要古风雅致，像是一位仙子在揭示宿命。
    - color: 代表该角色的中国传统色十六进制代码（如黛玉可用月白 #d6ecf0，宝钗可用浅赭 #f3e5d8，熙凤可用胭脂红 #9d2933）
  `;

  let characterData;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            poem: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            color: { type: Type.STRING },
          },
          required: ["name", "poem", "tags", "description", "color"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    characterData = JSON.parse(text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback character
    characterData = {
      name: "林黛玉",
      poem: "可叹停机德，堪怜咏絮才。\n玉带林中挂，金簪雪里埋。",
      tags: ["多愁善感", "孤高自许", "咏絮之才"],
      description: "卿本是西方灵河岸上三生石畔的绛珠仙草。见落花而伤情，遇秋风而悲歌。你心思细腻，才华横溢，不随波逐流，有着超凡脱俗的孤高之气。这世间的繁华于你不过是过眼云烟，唯有那份真性情，才是你灵魂的归宿。",
      color: "#d6ecf0"
    };
  }

  let imageUrl = '';
  try {
    const imagePrompt = `红楼梦人物形象，${characterData.name}的古装仕女半身像，明清闺阁装扮，发髻钗环，面容与气质符合该角色经典形象，${characterData.tags.join('、')}。中国传统工笔或水墨人物画风格，古典优雅，留白意境，像87版红楼梦或经典红楼插画中的人物造型，清晰可辨的角色肖像`;
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: imagePrompt,
    });
    
    const parts = imageResponse.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (imgError) {
    console.error("Error generating image:", imgError);
  }

  return {
    id: characterData.name,
    imageUrl,
    ...characterData
  };
}
