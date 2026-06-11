'use client';
import { useState, useEffect } from 'react';

export default function ReviewPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = () => {
    fetch('/api/review-photo?status=pending')
      .then(r => r.json())
      .then(d => { setQueue(d.queue); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchQueue(); }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    await fetch('/api/review-photo', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId: id, action, moderator: 'admin' }),
    });
    fetchQueue();
  };

  if (loading) return <div className="p-8 text-gray-500">Loading review queue...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Photo Moderation Queue</h1>
      {queue.length === 0 ? (
        <p className="text-gray-500">No pending photos. User-submitted photos will appear here.</p>
      ) : (
        <div className="space-y-4">
          {queue.map((item: any) => (
            <div key={item.id} className="bg-white rounded-xl border p-4 flex gap-4 items-start">
              <img src={item.photoUrl} alt="submitted" className="w-32 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="text-sm font-medium">Destination: {item.destinationId}</p>
                <p className="text-xs text-gray-500">Submitted by: {item.submittedBy}</p>
                <p className="text-xs text-gray-400">{new Date(item.submittedAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAction(item.id, 'approve')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                  Approve
                </button>
                <button onClick={() => handleAction(item.id, 'reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
