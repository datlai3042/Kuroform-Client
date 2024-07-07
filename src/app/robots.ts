import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/dashboard/", "/settings/", "/notifcations/"],
		},
		sitemap: "https://tally-form-mini-client.vercel.app/sitemap.xml",
	};
}
