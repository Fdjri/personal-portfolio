"use client";

import dynamic from "next/dynamic";

const Ribbons = dynamic(() => import("./Ribbons"), { ssr: false });

export default function RibbonsWrapper(props: any) {
  return <Ribbons {...props} />;
}
