import React from "react";
import { createGlobalStyle } from "styled-components";
import { graphql, useStaticQuery  } from "gatsby";

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Open Sans', sans-serif;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    
  }
  h1{
    font-size: 2em;
  }
`;

export const Layout = ({ children }) => {

    //Mandatory to useStaticQuery here because this is not a gatsby page
    const result = useStaticQuery(graphql`
        fragment menuItemData on ContentfulMenuItem {
          id
          label
          page {
            slug
          }
        }
        
        query MenuQuery {
          contentfulMenu {
            menuItems {
              ...menuItemData
              subMenuItems {
                ...menuItemData
              }
            }
          }
        }
    `);

    console.log(result);    

    return (
        <div>
            <GlobalStyle />
            {/*Menu construction using the query*/}
            <div>
              {result.contentfulMenu.menuItems.map((menuItem) => (
                <div key={menuItem.id}>
                    <div>{menuItem.label}</div>
                    {menuItem.subMenuItems?.map((subMenuItem) => (
                      <div key={subMenuItem.id}>{subMenuItem.label}</div>
                    ))}
                </div>
              ))}
            </div>
            <section>{children}</section>
        </div>
    );
};
