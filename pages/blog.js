import React, { useEffect, useState } from 'react';
import styles from "../styles/Blog.module.css"
import Link from "next/link"
import * as fs from "fs"
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useEffect } from "react/cjs/react.production.min";


//collect all the files from blogdata directory
//iterate through the and display them

function Blog(props) {
  console.log("props", props)
  const [blog, setblog] = useState(props.allblogs);
  const [count, setCount] = useState(2);

console.log("blog",blog)

  const fetchData = async () => {
    let d = await fetch(`http://localhost:8080/api/blogs/?count=${count + 2}`)
    console.log("d",d)
    setCount(count + 2)
    let data = await d.json()
    setblog(data)
  }

  return <div className={styles.container}>
    <main className={styles.main}>


      <InfiniteScroll
        dataLength={blog.length} //This is important field to render the next data
        next={fetchData}
        hasMore={props.Alldata !== blog.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >

        {blog.map((v, i) => {
          return <div key={v.slug} >
            <Link href={`/blogpost/${v.slug}`} passHref>
              <h3 className={styles.blogItem3} >{v.title}</h3></Link>
            <p className={styles.blogItemp} > {v.content.substr(0, 150)}...</p>

          </div>

        })}

      </InfiniteScroll>




    </main>

  </div>

}



export async function getStaticProps(context) {

  let data = await fs.promises.readdir("blogdata")
  let Alldata = data.length
  // console.log("data 2==>",data)

  let myfile;
  let allblogs = [];

  for (let index = 0; index < 2; index++) {
    const item = data[index];
    // console.log("item==>",item)
    myfile = await fs.promises.readFile(("blogdata/" + item), "utf-8")
    allblogs.push(JSON.parse(myfile))

  }
  return {
    props: { allblogs, Alldata }, // will be passed to the page component as props
  }
}

// export async function getServerSideProps(context) {
//   let data = await fetch("http://localhost:8080/api/blogs")

//   let myBlogs = await data.json()

//   return {
//     props: {myBlogs}, // will be passed to the page component as props
//   }
// }

export default Blog;
