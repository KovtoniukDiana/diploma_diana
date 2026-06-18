'use client'
import { useState } from 'react'
import { deleteComment } from '@/src/actions/comments'
import CommentForm from './commentForm'

interface IProps {
    comment: any
    movieId: number
    currentUserId: string | null
    depth?: number
}

export default function CommentItem({ comment, movieId, currentUserId, depth = 0 }: IProps) {
    const [showReply, setShowReply] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteComment(comment.id, movieId)
        } catch {}
        setLoading(false)
    }

    const isOwner = currentUserId && comment.user?.email === currentUserId

    return (
        <div className={`flex flex-col gap-2 ${depth > 0 ? 'ml-4 pl-3 sm:ml-8 sm:pl-4 border-l border-gray-100' : ''}`}>
            <div className='flex flex-col gap-1 bg-white/50 rounded-xl p-4'>

                {/* Шапка коментаря */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        {comment.user?.image
                            ? <img src={comment.user.image} className='w-7 h-7 rounded-full object-cover' alt='' />
                            : <div className='w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-xs text-pink-500 font-bold'>
                                {comment.user?.name?.[0] ?? '?'}
                              </div>
                        }
                        <span className='text-sm font-medium'>{comment.user?.name ?? 'Користувач'}</span>
                        <span className='text-xs text-gray-400'>
                            {new Date(comment.createdAt).toLocaleDateString('uk-UA')}
                        </span>
                    </div>

                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className='text-xs text-red-400 hover:text-red-600'
                        >
                            {loading ? '...' : 'Видалити'}
                        </button>
                    )}
                </div>

                {/* Текст */}
                <p className='text-sm text-gray-700 mt-1'>{comment.text}</p>

                {/* Відповісти */}
                {depth < 2 && currentUserId && (
                    <button
                        onClick={() => setShowReply(!showReply)}
                        className='text-xs text-pink-400 hover:text-pink-600 self-start mt-1'
                    >
                        {showReply ? 'Скасувати' : 'Відповісти'}
                    </button>
                )}
            </div>

            {/* Форма відповіді */}
            {showReply && (
                <div className='ml-4 sm:ml-8'>
                    <CommentForm
                        movieId={movieId}
                        parentId={comment.id}
                        onCancel={() => setShowReply(false)}
                    />
                </div>
            )}

            {/* Вкладені відповіді */}
            {comment.replies?.map((reply: any) => (
                <CommentItem
                    key={reply.id}
                    comment={reply}
                    movieId={movieId}
                    currentUserId={currentUserId}
                    depth={depth + 1}
                />
            ))}
        </div>
    )
}