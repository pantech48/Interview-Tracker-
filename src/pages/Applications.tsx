import React, { useState } from 'react';
import { PlusCircle, Check, X, MoreHorizontal, Trash2, Edit2, Save } from 'lucide-react';

interface Application {
  id: string;
  company: string;
  hrCall: string;
  techInterview: string;
  managerInterview: string;
  otherNotes: string;
  jobOffer: string;
  status: 'ongoing' | 'success' | 'unsuccessful';
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [newApplication, setNewApplication] = useState<Application>({
    id: '',
    company: '',
    hrCall: '',
    techInterview: '',
    managerInterview: '',
    otherNotes: '',
    jobOffer: '',
    status: 'ongoing',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
    const { name, value } = e.target;
    if (id) {
      setApplications(apps =>
        apps.map(app =>
          app.id === id ? { ...app, [name]: value } : app
        )
      );
    } else {
      setNewApplication(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddApplication = () => {
    if (newApplication.company) {
      setApplications(prev => [
        { ...newApplication, id: Date.now().toString() },
        ...prev,
      ]);
      setNewApplication({
        id: '',
        company: '',
        hrCall: '',
        techInterview: '',
        managerInterview: '',
        otherNotes: '',
        jobOffer: '',
        status: 'ongoing',
      });
      setIsAdding(false);
    }
  };

  const handleStatusChange = (id: string, status: 'ongoing' | 'success' | 'unsuccessful') => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleEditApplication = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id: string) => {
    setEditingId(null);
  };

  const statusColors = {
    ongoing: 'bg-yellow-200',
    success: 'bg-green-200',
    unsuccessful: 'bg-red-200',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <button
        className="mb-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
        onClick={() => setIsAdding(true)}
      >
        <PlusCircle size={18} className="mr-2" />
        Add New Application
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Company</th>
              <th className="py-2 px-4 text-left">HR Call</th>
              <th className="py-2 px-4 text-left">Tech Interview</th>
              <th className="py-2 px-4 text-left">Manager Interview</th>
              <th className="py-2 px-4 text-left">Other Notes</th>
              <th className="py-2 px-4 text-left">Job Offer</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="company"
                    value={newApplication.company}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Company name"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="hrCall"
                    value={newApplication.hrCall}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="HR call details"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="techInterview"
                    value={newApplication.techInterview}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Tech interview details"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="managerInterview"
                    value={newApplication.managerInterview}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Manager interview details"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="otherNotes"
                    value={newApplication.otherNotes}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Other notes"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    name="jobOffer"
                    value={newApplication.jobOffer}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Job offer details"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={handleAddApplication}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                  >
                    Add
                  </button>
                </td>
                <td></td>
              </tr>
            )}
            {applications.map((app) => (
              <tr key={app.id} className={`${statusColors[app.status]} hover:opacity-90`}>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="company"
                      value={app.company}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.company
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="hrCall"
                      value={app.hrCall}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.hrCall
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="techInterview"
                      value={app.techInterview}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.techInterview
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="managerInterview"
                      value={app.managerInterview}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.managerInterview
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="otherNotes"
                      value={app.otherNotes}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.otherNotes
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="jobOffer"
                      value={app.jobOffer}
                      onChange={(e) => handleInputChange(e, app.id)}
                      className="w-full px-2 py-1 border rounded bg-white"
                    />
                  ) : (
                    app.jobOffer
                  )}
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(app.id, 'ongoing')}
                      className={`p-1 rounded ${app.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-200'}`}
                      title="Ongoing"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, 'success')}
                      className={`p-1 rounded ${app.status === 'success' ? 'bg-green-500' : 'bg-gray-200'}`}
                      title="Success"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, 'unsuccessful')}
                      className={`p-1 rounded ${app.status === 'unsuccessful' ? 'bg-red-500' : 'bg-gray-200'}`}
                      title="Unsuccessful"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    {editingId === app.id ? (
                      <button
                        onClick={() => handleSaveEdit(app.id)}
                        className="p-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        title="Save"
                      >
                        <Save size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditApplication(app.id)}
                        className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;