import { data } from 'autoprefixer';
import React from 'react';
import Tree from 'react-d3-tree';


export default function TreeView({tree}) {

  const myTreeConfig = {
    nodeSize: {
      x: 120,
      y: 120,
    },
  };

  const getDynamicPathClass = ({ source, target }, orientation) => {
    // console.log(source)
    if (!target.children) {
      if(target.data.isSolutionPath) {
        return 'link__to-leaf solution-link';
      }
      return 'link__to-leaf normal-link';
    }else {
      if(target.data.isSolutionPath) {
        return 'link__to-branch solution-link';
      }
    }
    return 'link__to-branch normal-link';
  };

  const formatText = (input) => {
    const cleanedString = input.replace(/,/g, '');
    const resultArray = [];
    for (let i = 0; i < cleanedString.length; i += 3) {
      const subArray = cleanedString.slice(i, i + 3).split('').map(Number);
      resultArray.push(subArray);
    }

    let result = []
    resultArray.forEach((item) => {
      result.push(<tspan style={{ color: 'black' }} x="0" dy={10}>{item.join('')}</tspan>)
    })
    return result;
  };
  

  const customNode = ({nodeDatum}) => {
    const { isSolutionPath } = nodeDatum;
    const nodeColor = isSolutionPath ? '#08DB06' : 'red';
    return (
    <g>
    <circle
        r={35}
        style={{
          fill: nodeColor,
          stroke: 'black',
          strokeWidth: '1px',
        }}
      />
      <text
        textAnchor="middle"
        style={{
          color: 'black',
          fill: 'black',
          fontSize: '10px',
          fontWeight: 'bold',
        }}
        dy={4} 
      >
        {formatText(nodeDatum.name)}
      </text>
    </g>
    )
  }


  return (
    <div id="treeWrapper" style={{ width: '100%', height: '70vh' }}>
      <Tree 
        data={tree} orientation='vertical' 
        {...myTreeConfig} 
        renderCustomNodeElement={customNode}
        rootNodeClassName='solution-node'
        branchNodeClassName='solution-node'
        pathClassFunc={getDynamicPathClass} 
      />
    </div>
  );
}