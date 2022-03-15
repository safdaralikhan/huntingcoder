import React ,{useState,useEffect} from 'react';
import {useRouter} from "next/router"
import styles from "../../styles/BlogPost.module.css"
import * as fs from "fs"

// find the file corresponding to the slug
// populate them insisde the page

function Slug(props) {
  const [blog ,setBlog]= useState(props.myblog)

  const router = useRouter()




  return <div className={styles.container}>
    <main className={styles.main}>
<h1>{blog && blog.title}</h1>
<hr/>

<div>
  {blog && blog.content}
</div>
    </main>

    </div>

}


export async function getStaticPaths() {
  return {
    paths: [
      { params: {slug: "how to learn flask" } },
      { params: {slug: "how to learn javascript" } },
      { params: {slug: "how to learn python" } },

    ],
    fallback: true // false or 'blocking'
  };
}





// GET STATICSIDE PROPS

export async function getStaticProps(context) {
  const {slug} = context.params

  let myblog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8" )





  return {
    props: {myblog:JSON.parse(myblog)}, // will be passed to the page component as props
  }
}





// GET SERVERSIDEPROPS

// export async function getServerSideProps(context) {
//   const {slug} = context.query

//   let data = await  fetch(`http://localhost:8080/api/getblogs?slug=${slug}`)

//   let myBlog = await data.json()

//   return {
//     props: {myBlog}, // will be passed to the page component as props
//   }
// }


export default Slug;
