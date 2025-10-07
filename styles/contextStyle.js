import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  savedText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
    marginBottom: 20,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    minHeight: 200,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    minHeight: 150,
  },
  characterCount: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 12,
    color: '#999',
  },
});