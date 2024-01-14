export default async function handler(req, res) {
  const { method, query } = req;
  console.log(query);

  if (req.method === "GET") {
    try {
      const response = await fetch(
        `http://localhost:4040/latest/result/findByName/${query.q}`
      );
      const posts = await response.json();
      res.status(200).send({ posts });
    } catch (e) {
      return res.status(500).send(e);
    }
  } else if (req.method === "POST") {
    // 处理 POST 请求
    // 在这里编写您的逻辑
    res.status(200).json({ message: "POST request handled" });
  } else {
    // 处理其他请求类型
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
