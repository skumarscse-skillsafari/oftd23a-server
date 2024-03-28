import Posts from "../models/postModel.js";
export const createPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    const newPost = await Posts.create({
      author: id,
      ...req.body,
      tags: tags.split(",").map((tag) => tag.trim()),
    });
    if (!newPost)
      return res.status(400).json({ success: false, message: error });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find().populate("author");
    if (!allPosts)
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    // console.log(allPosts);
    const posts = allPosts.map((post) => {
      return {
        _id: post._id,
        author: post.author.username,
        author_id: post.author._id,
        title: post.title,
        description: post.description,
        image: post.image,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id).populate("author");
    if (!post) return res.status(404).json({ success: false, message: error });
    const newPost = {
      _id: post._id,
      author: post.author.username,
      title: post.title,
      description: post.description,
      image: post.image,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, tags } = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          image,
          tags: tags.split(",").map((tag) => tag.trim()),
        },
      },
      { new: true }
    );
    if (!updatedPost)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Posts.findByIdAndDelete(id);
    if (!deletePost)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong" });

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
