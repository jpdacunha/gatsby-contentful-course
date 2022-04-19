import React from 'react';
import { Layout } from 'components';
import { graphql } from 'gatsby';

export default function ContentfulPage(props) {
    //{contentfulPage.slug}.js Gatsby interprets the name of the page as a graphql query (because of curly braces syntax)
    //Gatsby inject in props the result of contentfulPage.slug.js (id and slug fields)
    console.log(props);
    return (
        <Layout>
            <h1>{props.data.contentfulPage.title}</h1>
        </Layout>
    );

}

// Gatsby inject the current page id directly in query context. This id comes from contentfulPage.slug.js
// This query is to retrieve all current page datas from contentFull using the current id
export const query = graphql`
    query SinglePageQuery($id: String) {
        contentfulPage(id: {eq: $id}) {
            id
            title
        }
    }
`;