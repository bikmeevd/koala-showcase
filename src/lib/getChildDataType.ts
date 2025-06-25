const getChildDataType = (relationshipType: string): "nemesis" | "secret" => {
  if (relationshipType === "has_nemesis") return "nemesis";
  if (relationshipType === "has_secrete") return "secret";
  return "nemesis";
};
export default getChildDataType;
