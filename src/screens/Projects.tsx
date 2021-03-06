import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Projects: DefaultNavigationProps<Params, ScreenProps> = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Projects</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Projects.navigationOptions = {
  title: 'Projects',
};

export default Projects;
