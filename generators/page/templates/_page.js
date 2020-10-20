import * as React from 'react';
import { Layout } from '@/component';

interface IProps {};

export const <%= component %>: React.FC<IProps> = () => {
  return (
  <Layout title="<%= title %>" description="This is the <%= title %> Page">
    <>
      <p>
        This is the <strong><%= title %></strong> page
      </p>
    </>
  </Layout>
)};

export default React.memo(<%= component %>);
