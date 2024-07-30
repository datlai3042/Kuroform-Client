import { MetadataRoute, } from "next";
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

const sitemap = async ()=> {
      const { forms } = (await FormService.getAllForm()).metadata;

      const siteMapForms = forms.reduce<MetadataRoute.Sitemap[]>((acc, curr) => {
                  const sitemapItem = {

                        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/form/${curr._id}`,
                        lastModified: new Date(),
                        changeFrequency: "hourly",
                        priority: 0.8,
                  }

                  acc.push(sitemapItem as unknown as MetadataRoute.Sitemap)
                  return acc

      }, [])

      return [...staticSiteMap, ...siteMapForms]
}

export default sitemap;
