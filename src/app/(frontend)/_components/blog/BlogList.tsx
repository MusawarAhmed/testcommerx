
import { Blog } from "../../_lib/types";
import BlogCard from "./BlogCard";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
}
