import { useCallback, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { SelectPuppy } from "@db/schema";

interface LineageNode {
  name: string;
  attributes?: {
    age?: string;
    color?: string;
    breed?: string;
    relationshipType?: string;
  };
  children?: LineageNode[];
}

interface LineageData {
  puppy: SelectPuppy;
  parents: (SelectPuppy & { relationshipType: string })[];
  children: (SelectPuppy & { relationshipType: string })[];
}

interface Props {
  puppyId: number;
}

export function LineageTree({ puppyId }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useCallback((containerElem: HTMLDivElement) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const { data: lineageData, isLoading } = useQuery<LineageData>({
    queryKey: [`/api/puppies/${puppyId}/lineage`],
  });

  const formatTreeData = useCallback((data: LineageData): LineageNode => {
    const parents = data.parents.map((parent) => ({
      name: parent.name,
      attributes: {
        age: parent.age,
        color: parent.color,
        breed: parent.breed,
        relationshipType: parent.relationshipType,
      },
    }));

    const children = data.children.map((child) => ({
      name: child.name,
      attributes: {
        age: child.age,
        color: child.color,
        breed: child.breed,
        relationshipType: child.relationshipType,
      },
    }));

    return {
      name: data.puppy.name,
      attributes: {
        age: data.puppy.age,
        color: data.puppy.color,
        breed: data.puppy.breed,
      },
      children: [...parents, ...children],
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!lineageData) {
    return null;
  }

  const treeData = formatTreeData(lineageData);

  return (
    <Card className="relative h-[600px]" ref={containerRef}>
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        dimensions={{
          width: dimensions.width,
          height: dimensions.height,
        }}
        translate={{
          x: dimensions.width / 2,
          y: dimensions.height / 4,
        }}
        nodeSize={{ x: 200, y: 100 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <g>
            <circle r={20} fill="#8b5cf6" />
            <text
              dy="-25"
              x="0"
              textAnchor="middle"
              style={{ fill: "#374151", fontSize: "14px" }}
            >
              {nodeDatum.name}
            </text>
            {nodeDatum.attributes && (
              <>
                <text
                  dy="20"
                  x="0"
                  textAnchor="middle"
                  style={{ fill: "#6b7280", fontSize: "12px" }}
                >
                  {nodeDatum.attributes.breed}
                </text>
                {nodeDatum.attributes.relationshipType && (
                  <text
                    dy="35"
                    x="0"
                    textAnchor="middle"
                    style={{ fill: "#6b7280", fontSize: "12px" }}
                  >
                    {nodeDatum.attributes.relationshipType}
                  </text>
                )}
              </>
            )}
          </g>
        )}
      />
    </Card>
  );
}
