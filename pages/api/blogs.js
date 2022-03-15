// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"

export default async function handler(req, res) {
  // console.log("data==>",data)

  let data = await fs.promises.readdir("blogdata")
  data = data.slice(0, parseInt(req.query.count))
  // console.log("data 2==>",data)

  let myfile;
  let allblogs = [];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    // console.log("item==>",item)
    myfile = await fs.promises.readFile(("blogdata/" + item),"utf-8")
    allblogs.push(JSON.parse(myfile))

  }
  // console.log("myfile==>",myfile)

  res.status(200).json( (allblogs) )
  }
