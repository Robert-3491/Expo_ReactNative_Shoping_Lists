import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/assets/colors";
import { MainList } from "@/data/models/mainList";
import { SectionList } from "@/data/models/sectionList";
import {
  getSectionContentCount,
  getMainListContentCount,
} from "@/containers/contentCountContainer";

interface Props {
  mainList?: MainList;
  sectionList?: SectionList;
}

const ContentCount: React.FC<Props> = ({ mainList, sectionList }) => {
  const [contentCount, setContentCount] = useState(
    mainList
      ? getMainListContentCount(mainList)
      : sectionList
      ? getSectionContentCount(sectionList)
      : ""
  );

  useEffect(() => {
    // Update content count when props change
    const newCount = mainList
      ? getMainListContentCount(mainList)
      : sectionList
      ? getSectionContentCount(sectionList)
      : "";
    setContentCount(newCount);
  }, [mainList, sectionList]);

  return (
    <View>
      <Text style={styles.text}>{contentCount}</Text>
    </View>
  );
};

export default ContentCount;

const styles = StyleSheet.create({
  text: {
    color: colors.textSecondary,
  },
});
