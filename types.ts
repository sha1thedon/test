import {Card, Note} from '@prisma/client'

export type NoteWithCard = Note & { cards: Card[] }

export type CardWithNote = Card & { note: Note }