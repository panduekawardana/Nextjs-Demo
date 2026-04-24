'use client';
import Image from "next/image";

export const ExploreButton = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={()=> console.log('Okedehh')}>
      <a href="#events">
        Explore Button
        <Image src="/icons/arrow-down.svg" alt="arrow down" width={24} height={24}/>
      </a>
    </button>
  );
};
