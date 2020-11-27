import React from 'react';
import { NextPage } from 'next';
import ErrorPage from 'next/error';

import Layout from '../../components/Layout';
import PostPage from '../../components/PostPage';
import { authInitialProps } from '../../lib/auth';
import { iPost, authType } from '../../@types';
import { baseURL } from '../../lib/config';

interface Props {
  post?: iPost;
  authData: authType;
}

const Post: NextPage<Props> = ({ post, authData }) => {
  return post && post._id ? (
    <Layout title={post.title} authData={authData} displayNav displayFooter>
      <PostPage post={post} />
    </Layout>
  ) : (
    <ErrorPage statusCode={404} />
  );
};

Post.getInitialProps = async (ctx) => {
  const { postId } = ctx.query;

  const { user } = await authInitialProps()(ctx);
  const data = await fetch(`${baseURL}/api/posts/id/${postId}`).then((res) =>
    res.json(),
  );

  return { post: data, authData: user };
};

export default Post;