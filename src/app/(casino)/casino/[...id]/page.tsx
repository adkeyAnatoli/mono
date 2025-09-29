"use client";

import { IOffer, IRoot } from "@/app/utils/interfaces";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Loading from "@/app/loading";
import axios from "axios";

export default function CasinoPage() {
  const [siteData, setSiteData] = useState<IRoot>();
  const { replace } = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get("https://api.adkey-seo.com/api/website/get-website/344")
      .then(function (response) {
        setSiteData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    const ID = params.id[0];
    if (siteData)
      replace(
        `${siteData.offers.filter((item: IOffer) => item.id.toString() === ID)[0].link}`,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteData]);

  return <Loading />;
}
