import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DefaultNavigationProps } from '!/types';

type Params = {};

type ScreenProps = {};

const Projects: DefaultNavigationProps<Params, ScreenProps> = () => {
  return (
    <View style={styles.container}>
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
