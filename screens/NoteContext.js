import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView,} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/contextStyle';

const NoteContext = ({ route, navigation }) => {
  const { noteId } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isNewNote, setIsNewNote] = useState(!noteId);
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (noteId) {
      loadNote();
      setIsNewNote(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (title || content) {
      saveTimeoutRef.current = setTimeout(() => {
        saveNote();
      }, 1000);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content]);

  const loadNote = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const notes = JSON.parse(storedNotes);
        const note = notes.find((n) => n.id === noteId);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      }
    } catch (e) {
      console.e('Failed loading note:', e);
    }
  };

  const saveNote = async () => {
    if (!title && !content) return;

    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : [];
      const timestamp = Date.now();

      if (isNewNote) {
        //create new note
        const newNote = {
          id: 'note_' + timestamp,
          title: title.trim() || 'Untitled',content,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        notes.unshift(newNote);
        setIsNewNote(false);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.setParams({ noteId: newNote.id });
      } else {
        //update existing note
        const noteIndex = notes.findIndex((n) => n.id === noteId);
        if (noteIndex !== -1) {
          notes[noteIndex] = {
            ...notes[noteIndex],
            title: title.trim() || 'Untitled',
            content,
            updatedAt: timestamp,
          };
          await AsyncStorage.setItem('notes', JSON.stringify(notes));
        }
      }

      setLastSaved(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    } catch (e) {
      console.e('Failed saving note:', e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          {lastSaved && <Text style={styles.savedText}>Saved at {lastSaved}</Text>}
        </View>
        <TextInput
          style={styles.titleInput}
          placeholder="Note Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="Start typing your note... (100 character limit)"
            placeholderTextColor="#999"
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={100}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{content.length}/100</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NoteContext;

