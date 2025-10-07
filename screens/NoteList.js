import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/listStyle';

export default function NoteList({ navigation }) {
  const [notes, setNotes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  //Read notes
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.log('Notes failed to load', e);
    }
  };

  //Delete note
  const deleteNote = async (id) => {
    Alert.alert('Delete note', 'You sure buddy?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
          } catch (e) {
            console.error('Failed to delete note', e);
          }
        },
      },
    ]);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  const getPreview = (text) => {
    if (!text) return '';
    return text.length > 30 ? text.slice(0, 30) + '...' : text;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          notes.length === 0 ? styles.emptyContainer : styles.notEmptyContainer
        }>
        {notes.length === 0 ? (
          <View>
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text>Click the button below to create a note</Text>
          </View>
        ) : (
          notes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>{note.title || 'Untitled'}</Text>
                <Text style={styles.notePreview}>{getPreview(note.content)}</Text>
                <View style={styles.dataContainer}>
                  <Text style={styles.dateText}>Created: {formatDate(note.createdAt)}</Text>
                  {note.updatedAt && note.updatedAt !== note.createdAt && (
                    <Text style={styles.dateText}>Last edited: {formatDate(note.updatedAt)}</Text>
                  )}
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate('NoteContext', { noteId: note.id })
                  }>
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteNote(note.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addNoteButton}
        onPress={() => navigation.navigate('NoteContext', { noteId: null })}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
