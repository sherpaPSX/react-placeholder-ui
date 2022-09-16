import {
  ContainerDimensionsProps,
  DrawItemProps,
} from "./../models/Interfaces";

const renderSvgElementsAsString = (elements: DrawItemProps[]) => {
  const elString = elements.map((item) => {
    if (item.isCircle) {
      return `<circle cx="${item.posX + item.width / 2}" cy="${
        item.posY + item.width / 2
      }" r="${item.width / 2}" />`;
    } else {
      return `<rect x="${item.posX}" y="${item.posY}" width="${item.width}" height="${item.height}" rx="${item.rounded}" ry="${item.rounded}" />`;
    }
  });

  return elString.join("\n");
};

export const renderCodeSnippet = ({
  containerDimensions,
  elements,
}: {
  containerDimensions: ContainerDimensionsProps;
  elements: DrawItemProps[];
}) => {
  return `import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    width={${containerDimensions.width}}
    height={${containerDimensions.height}}
    viewBox="0 0 ${containerDimensions.width} ${containerDimensions.height}"
    {...props}
  >
    ${renderSvgElementsAsString(elements)}
  </ContentLoader>
)

export default MyLoader

`;
};
