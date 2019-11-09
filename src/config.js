import Loadable from "react-loadable";
import React from 'react';

export const siteTitle = "Me - Inc";
export const siteMetaDescription = "Me - Inc";
export const setTitle = title => {
  document.title = title ? title : siteTitle;
};

export const setMetaDescription = description => {
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", description ? description : siteMetaDescription);
};

export const ROUTE = [
  {
    private: true,
    path: "/dashboard",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/Dashboard"),
      loading: () => <div>Loading..</div>
    })
  },

  {
    private: false,
    path: "/",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/Dashboard"),
      loading: () => <div>Loading..</div>
    })
  }
];
