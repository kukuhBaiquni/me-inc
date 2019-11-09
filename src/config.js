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
    private: false,
    path: "/",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/dashboard/Dashboard"),
      loading: () => <div>Loading..</div>
    })
  },
  {
    private: true,
    path: "/dashboard",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/dashboard/Dashboard"),
      loading: () => <div>Loading..</div>
    })
  },
  {
    private: true,
    path: "/overview",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/overview/Overview"),
      loading: () => <div>Loading..</div>
    })
  },
  {
    private: true,
    path: "/pos",
    exact: true,
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./page/pos/Pos"),
      loading: () => <div>Loading..</div>
    })
  }
];
