import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://scrawlofficial.vercel.app";

export default function HelmetComponent({ title, description }) {
  const fullTitle = `${title} — Scrawl`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="anonymous wall, public wall, share feelings, thoughts, confessions, safe space, kindness, impermanence, anonymous posting, mental wellness" />
      <meta name="author" content="Scrawl" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#fb923c" />
      <link rel="canonical" href={BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Scrawl" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:locale" content="en_US" />
    </Helmet>
  );
}