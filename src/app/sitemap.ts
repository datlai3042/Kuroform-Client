import { MetadataRoute } from "next";
import FormService from "./_services/form.service";

const staticSiteMap = [
      {
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
      },
      {
            url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
      },
];
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
      const { forms } = (await FormService.getAllForm()).metadata;

      return staticSiteMap
}

export default sitemap;
