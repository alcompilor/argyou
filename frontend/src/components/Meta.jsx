import { Helmet } from "react-helmet-async";

export const Meta = ({
    title,
    desc,
    imgUrl,
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={imgUrl} />
            <meta
                property="og:url"
                content={import.meta.env.VITE_WEBSITE_URL}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={imgUrl} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};
