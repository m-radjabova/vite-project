import { Blog } from "../page/home/Home"

interface Props {
    blog: Blog[]
}

function SectionBlog({ blog }: Props) {
    return (
        <div className="section-blog">
            <div className="section-blog__title">
                <h2>Blog</h2>
                <p>Creative & Professional Creative Agency!</p>
            </div>
            <div className="section-blog__cards">
                {blog.map((item, index) => (
                    <div className="section-blog__card" key={index}>
                        <img src={item.imgUrl} alt="" />
                        <h4>{item.title}</h4>
                    </div>
                ))}
            </div>
            <div className="section-blog__dots">
                <div className="section-blog__dot"></div>
                <div className="section-blog__dot"></div>
                <div className="section-blog__dot"></div>
            </div>
        </div>
    )
}

export default SectionBlog