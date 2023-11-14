import {
    ReactCompareSlider,
    ReactCompareSliderImage,
  } from "react-compare-slider";
  
  export const CompareSlider = ({
    original,
    revived,
  }: {
    original: string;
    revived: string;
  }) => {
    return (
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={original} alt="Original Image" />}
        itemTwo={<ReactCompareSliderImage src={revived} alt="Revived Image" />}
        portrait
        className="flex w-[475px] mt-5"
      />
    );
  };
  