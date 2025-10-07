import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  notEmptyContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginTop: 20,
    borderWidth:1,
    borderColor:'black',
    elevation: 5,
  },
  noteContent: {
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  notePreview: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 15,
  },
  dataContainer: {
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: 'black',
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  actionButton: {
    backgroundColor: '#4040ffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#fa3445ff',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  addNoteButton: {
    position: 'absolute',
    backgroundColor: '#4040ffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
  },
})