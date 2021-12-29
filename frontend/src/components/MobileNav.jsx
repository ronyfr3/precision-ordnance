import React, { useRef } from "react";
import { SlideMenu } from "primereact/slidemenu";
import { Button } from "primereact/button";

const MobileNav = () => {
  const menu = useRef(null);
  const items = [
    {
      label: "PRODUCTS",
      items: [
        {
          label: "OPTICS",
          items: [
            {
              label: "RIFLE SCOPES",
              command:()=>{ window.location="/subcategory/rifle scopes"; }
            },
            {
              label: "BINOCULARS",
              command:()=>{ window.location="/subcategory/binoculars"; }
            },
            {
              label: "RANGEFINDERS",
              command:()=>{ window.location="/subcategory/rangefinders"; }
            },
            {
              label: "RED DOTS",
              command:()=>{ window.location="/subcategory/red dots"; }
            },
            {
              label: "RINGS & MOUNTS",
              command:()=>{ window.location="/subcategory/rings & mounts"; }
            },
            {
              label: "ACCESSORIES",
              command:()=>{ window.location="/subcategory/accessories"; }
            },
          ],
        },
        {
          label: "RIFLE COMPONENTS",
          items: [
            {
              label: "ACTIONS",
              command:()=>{ window.location="/subcategory/actions"; }
            },
            {
              label: "BARRELS",
              command:()=>{ window.location="/subcategory/barrels"; }
            },
            {
              label: "TRIGGERS",
              command:()=>{ window.location="/subcategory/triggers"; }
            },
            {
              label: "MUZZLE BRAKES",
              command:()=>{ window.location="/subcategory/muzzle brakes"; }
            },
            {
              label: "BOTTOM METAL & MAGAZINES",
              command:()=>{ window.location="/subcategory/bottom metal & magazines"; }
            },
          ],
        },
        {
          label: "NIGHT VISION & THERMAL",
          items: [
            {
              label: "SCOPES",
              command:()=>{ window.location="/subcategory/scopes"; }
            },
            {
              label: "MONOCULARS & BINOCULARS",
              command:()=>{ window.location="/subcategory/monoculars & binoculars"; }
            },
          ],
        },
        {
          label: "BIPODS & BAGS",
          items: [
            {
              label: "BIPODS",
              command:()=>{ window.location="/subcategory/bipods"; }
            },
            {
              label: "SHOOTING BANGS",
              command:()=>{ window.location="/subcategory/shooting bags"; }
            },
          ],
        },
        {
          label: "CLEANING SUPPILES",
        },
      ],
    },
    {
      label: "BRANDS",
      items: [
        {
          label: "KAHLES",
          command:()=>{ window.location="/brand/kahles"; }
        },
        {
          label: "NIGHTFORCE",
          command:()=>{ window.location="/brand/nightforce"; }
        },
        {
          label: "PULSAR",
          command:()=>{ window.location="/brand/pulsar"; }
        },
        {
          label: "HAWKINS",
          command:()=>{ window.location="/brand/hawkins"; }
        },
        {
          label: "VORTEX",
          command:()=>{ window.location="/brand/vprtex"; }
        },
        {
          label: "DEFIANCE MACHINE",
          command:()=>{ window.location="/brand/defiance machine"; }
        },
        {
          label: "BORDEN",
          command:()=>{ window.location="/brand/borden"; }
        },
        {
          label: "TRIGGER TECH",
          command:()=>{ window.location="/brand/trigger tech"; }
        },
        {
          label: "JEWEL",
          command:()=>{ window.location="/brand/jewel"; }
        },
        {
          label: "TERMINATOR",
          command:()=>{ window.location="/brand/terminator"; }
        },
      ],
    },
    {
      label: "GALLERY",
      command:()=>{ window.location="/gallery"; }
    },
    {
      label: "OUR STORY",
      command:()=>{ window.location="/our-story"; }
    },
  ];

  return (
    <div>
      <div className="card">
        {/* <h5>Basic</h5>
                <SlideMenu model={items} viewportHeight={220} menuWidth={175}></SlideMenu> */}

        {/* <h5>Popup</h5> */}
        <SlideMenu
          ref={menu}
          model={items}
          popup
          viewportHeight={220}
          menuWidth={175}
        ></SlideMenu>
        <Button
          type="button"
          icon="pi pi-bars"
          label=""
          onClick={(event) => menu.current.toggle(event)}
        ></Button>
      </div>
    </div>
  );
};

export default MobileNav;
