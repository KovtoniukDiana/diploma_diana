'use client'
import { useState } from 'react'
import { addComment } from '@/src/actions/comments'

interface IProps {
    movieId: number
    parentId?: string
    onCancel?: () => void
}

export default function CommentForm({ movieId, parentId, onCancel }: IProps) {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!text.trim()) return
        setLoading(true)
        try {
            await addComment(movieId, text.trim(), parentId)
            setText('')
            onCancel?.()
        } catch {
            // не авторизований
        }
        setLoading(false)
    }

    return (
        <div className='flex flex-col gap-2'>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={parentId ? 'Написати відповідь...' : 'Написати коментар...'}
                className='w-full border border-gray-200 rounded-xl p-3 text-sm resize-none min-h-20 focus:outline-none focus:border-pink-300'
            />
            <div className='flex gap-2 justify-end'>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className='text-sm text-gray-400 px-4 py-2 rounded-xl hover:bg-gray-100'
                    >
                        Скасувати
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={loading || !text.trim()}
                    className='text-sm bg-pink-100 text-pink-500 border border-pink-300 px-4 py-2 rounded-xl hover:bg-pink-200 disabled:opacity-50'
                >
                    {loading ? 'Надсилання...' : 'Надіслати'}
                </button>
            </div>
        </div>
    )
}