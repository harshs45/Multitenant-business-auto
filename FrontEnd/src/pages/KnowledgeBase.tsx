import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  MessageSquare, 
  FileText, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Info,
  Loader2,
  AlertCircle,
  Database,
  ArrowLeft
} from 'lucide-react';
import { 
  getFAQs, 
  createFAQ, 
  deleteFAQ, 
  getDocuments, 
  createDocument, 
  deleteDocument,
  type FAQ,
  type KBDocument
} from '../lib/knowledgeBase.api';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

type Tab = 'faqs' | 'documents';

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const { botId } = useParams<{ botId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('faqs');
  
  // State
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [docs, setDocs] = useState<KBDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [docForm, setDocForm] = useState({ fileName: '', fileType: 'PDF', fileSize: 0 });

  useEffect(() => {
    if (botId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [botId, activeTab]);

  const fetchData = async () => {
    if (!botId) return;
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'faqs') {
        const res = await getFAQs(botId);
        setFaqs(res.data);
      } else {
        const res = await getDocuments(botId);
        setDocs(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botId || !faqForm.question || !faqForm.answer) return;
    setIsSubmitting(true);
    try {
      await createFAQ(botId, faqForm);
      setFaqForm({ question: '', answer: '' });
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to add FAQ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botId || !docForm.fileName) return;
    setIsSubmitting(true);
    try {
      await createDocument(botId, docForm);
      setDocForm({ fileName: '', fileType: 'PDF', fileSize: 0 });
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to add Document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!botId) return;
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(botId, id);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!botId) return;
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await deleteDocument(botId, id);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  if (!botId) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background border border-border rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-blue-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Bot Detected</h2>
          <p className="text-muted-foreground mb-8">
            Please create and generate your AI assistant before managing the knowledge base.
          </p>
          <button 
            onClick={() => navigate('/build')}
            className="w-full h-11 bg-primary text-blue-500-foreground rounded-lg font-bold hover:bg-primary/90 transition-all"
          >
            Go to Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate('/dashboard')} className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Dashboard
          </button>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Knowledge Base</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Database className="text-blue-500" size={32} /> Knowledge Base
            </h1>
            <p className="text-muted-foreground mt-2">
              Train your bot by providing FAQs and documentation.
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="h-11 px-6 bg-blue-500 text-blue-500-foreground rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue/20 flex items-center gap-2"
          >
            <Plus size={20} /> {activeTab === 'faqs' ? 'Add FAQ' : 'Add Document'}
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('faqs')}
            className={cn(
              "px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
              activeTab === 'faqs' ? "border-blue-500 text-blue-500" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageSquare size={18} /> FAQs
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={cn(
              "px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
              activeTab === 'documents' ? "border-blue-500 text-blue-500" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText size={18} /> Documents
          </button>
        </div>

        {/* Content Area */}
        <main className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p>Loading your knowledge base...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center text-destructive">
               <AlertCircle className="mx-auto mb-2" size={24} />
               <p className="font-medium">{error}</p>
               <button onClick={fetchData} className="mt-4 text-sm font-bold underline">Try again</button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'faqs' ? (
                <motion.div 
                  key="faqs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {faqs.length === 0 ? (
                    <EmptyState icon={MessageSquare} title="No FAQs yet" description="Add common questions and answers to help your bot stand out." />
                  ) : (
                    faqs.map((faq) => (
                      <div key={faq.id} className="bg-background border border-border rounded-xl p-5 shadow-sm group hover:border-primary/50 transition-colors">
                        <div className="flex justify-between gap-4">
                          <div className="space-y-2">
                            <h4 className="font-bold text-foreground">Q: {faq.question}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                          <button 
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all self-start"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="docs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {docs.length === 0 ? (
                    <EmptyState icon={FileText} title="No documents yet" description="Upload PDFs or text files to provide deeper context to your AI." />
                  ) : (
                    <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-muted/50 border-b border-border">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {docs.map((doc) => (
                            <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4 font-medium flex items-center gap-3">
                                <FileText size={16} className="text-blue-500" /> {doc.fileName}
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{doc.fileType}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">
                                {doc.fileSize > 0 ? `${(doc.fileSize / 1024).toFixed(1)} KB` : 'N/A'}
                              </td>
                              <td className="px-6 py-4">
                                <button 
                                  onClick={() => handleDeleteDoc(doc.id)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{activeTab === 'faqs' ? 'Add New FAQ' : 'Add Document Metadata'}</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-all"
                >
                  <Trash2 className="rotate-45" size={20} />
                </button>
              </div>

              {activeTab === 'faqs' ? (
                <form onSubmit={handleAddFaq} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question</label>
                    <input 
                      type="text" 
                      required
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      placeholder="e.g. What are your opening hours?"
                      className="w-full h-11 px-4 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Answer</label>
                    <textarea 
                      required
                      rows={4}
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Provide a clear and concise answer..."
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-blue-500 text-blue-500-foreground rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                    Create FAQ
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddDoc} className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 text-sm text-blue-500 mb-2">
                    <Info className="shrink-0" size={18} />
                    <p>
                      <strong>Note:</strong> Document parsing is not yet available. 
                      Only metadata will be stored at this time.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">File Name</label>
                    <input 
                      type="text" 
                      required
                      value={docForm.fileName}
                      onChange={(e) => setDocForm({ ...docForm, fileName: e.target.value })}
                      placeholder="e.g. pricing_guide.pdf"
                      className="w-full h-11 px-4 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</label>
                      <select 
                        value={docForm.fileType}
                        onChange={(e) => setDocForm({ ...docForm, fileType: e.target.value })}
                        className="w-full h-11 px-4 bg-muted/30 border border-border rounded-lg focus:outline-none transition-all"
                      >
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>TXT</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Size (KB)</label>
                      <input 
                        type="number" 
                        value={docForm.fileSize || ''}
                        onChange={(e) => setDocForm({ ...docForm, fileSize: parseInt(e.target.value) || 0 })}
                        placeholder="e.g. 1024"
                        className="w-full h-11 px-4 bg-muted/30 border border-border rounded-lg focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary text-blue-500-foreground rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                    Add Metadata
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-background border-2 border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="max-w-xs mx-auto text-sm">{description}</p>
    </div>
  );
}
