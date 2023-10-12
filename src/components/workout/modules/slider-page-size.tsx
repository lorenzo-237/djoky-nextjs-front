import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from '@chakra-ui/react';
import React from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

function SliderPageSize({
  pageSize,
  setPageSize,
}: {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Slider
      id='slider'
      defaultValue={DEFAULT_PAGE_SIZE}
      min={1}
      max={50}
      colorScheme='blue'
      onChange={(v) => setPageSize(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={10} mt='1' ml='-2.5' fontSize='sm'>
        10
      </SliderMark>
      <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
        25
      </SliderMark>
      <SliderMark value={40} mt='1' ml='-2.5' fontSize='sm'>
        40
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip hasArrow bg='blue.500' color='white' placement='top' isOpen={showTooltip} label={`${pageSize}`}>
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default SliderPageSize;
