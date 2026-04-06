import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Trash2, AlertCircle, ServerOff, Plus } from 'lucide-react';

const API_URL = 'http://localhost:8080/api';

interface Skill {
  id: number;
  name: string;
}

interface Candidate {
  id: number;
  fullName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  skills: Skill[];
}

export default function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchName, setSearchName] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(true);
  
  // stejtovi za forme
  const [newCandidate, setNewCandidate] = useState({ fullName: '', email: '', contactNumber: '', dateOfBirth: '' });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchCandidates();
    fetchSkills();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API_URL}/candidates`);
      setCandidates(res.data);
      setIsBackendConnected(true);
    } catch (error) {
      console.log("Greska pri povlacenju kandidata", error);
      setIsBackendConnected(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_URL}/skills`);
      setSkills(res.data);
    } catch (error) {
      // Handled by fetchCandidates
    }
  };

  const searchByName = async () => {
    if (!searchName) return fetchCandidates();
    try {
      const res = await axios.get(`${API_URL}/candidates/search?name=${searchName}`);
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/candidates/${id}`);
      fetchCandidates(); // osvezi listu posle brisanja
    } catch (error) {
      console.error(error);
    }
  };

  const addCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/candidates`, newCandidate);
      setNewCandidate({ fullName: '', email: '', contactNumber: '', dateOfBirth: '' });
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/skills`, { name: newSkill });
      setNewSkill('');
      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const addSkillToCandidate = async (candidateId: number, skillId: number) => {
    try {
      await axios.put(`${API_URL}/candidates/${candidateId}/skills/${skillId}`);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HR Platforma</h1>
            <p className="text-gray-500 mt-1">Upravljanje kandidatima i njihovim veštinama</p>
          </div>
          {!isBackendConnected && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
              <ServerOff className="w-5 h-5" />
              <span className="font-medium">Backend nije pokrenut na localhost:8080</span>
            </div>
          )}
        </header>

        {!isBackendConnected && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800 shadow-sm">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              Greška pri povezivanju sa serverom
            </h3>
            <p>
              React aplikacija ne može da se poveže sa Java backendom na <code>http://localhost:8080/api</code>. 
              Proveri da li si pokrenuo Spring Boot aplikaciju.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Leva kolona: Forme */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Dodaj kandidata
              </h2>
              <form onSubmit={addCandidate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
                  <input required type="text" value={newCandidate.fullName} onChange={e => setNewCandidate({...newCandidate, fullName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email adresa</label>
                  <input required type="email" value={newCandidate.email} onChange={e => setNewCandidate({...newCandidate, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kontakt telefon</label>
                  <input required type="text" value={newCandidate.contactNumber} onChange={e => setNewCandidate({...newCandidate, contactNumber: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Datum rođenja</label>
                  <input required type="date" value={newCandidate.dateOfBirth} onChange={e => setNewCandidate({...newCandidate, dateOfBirth: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <button type="submit" disabled={!isBackendConnected} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                  Sačuvaj kandidata
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-600" />
                Dodaj novu veštinu
              </h2>
              <form onSubmit={addSkill} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naziv veštine</label>
                  <input required type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <button type="submit" disabled={!isBackendConnected} className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
                  Sačuvaj veštinu
                </button>
              </form>
            </div>
          </div>

          {/* Desna kolona: Lista i pretraga */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold">Lista kandidata</h2>
                <div className="flex w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <input 
                      type="text" 
                      placeholder="Pretraga po imenu..." 
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchByName()}
                      className="w-full pl-10 pr-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <button onClick={searchByName} className="bg-gray-100 px-4 py-2 border border-l-0 rounded-r-lg hover:bg-gray-200 transition-colors">
                    Pretraži
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                      <th className="p-4 font-medium">Ime</th>
                      <th className="p-4 font-medium">Kontakt</th>
                      <th className="p-4 font-medium">Veštine</th>
                      <th className="p-4 font-medium text-right">Akcije</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {candidates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">
                          {isBackendConnected ? "Nema pronađenih kandidata." : "Čekam konekciju sa backendom..."}
                        </td>
                      </tr>
                    ) : (
                      candidates.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{c.fullName}</div>
                            <div className="text-sm text-gray-500">{c.email}</div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            {c.contactNumber}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {c.skills?.map(s => (
                                <span key={s.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  {s.name}
                                </span>
                              ))}
                            </div>
                            <select 
                              className="text-xs border rounded p-1 outline-none"
                              onChange={(e) => {
                                if(e.target.value) addSkillToCandidate(c.id, parseInt(e.target.value));
                                e.target.value = "";
                              }}
                              disabled={!isBackendConnected}
                            >
                              <option value="">+ Dodaj veštinu</option>
                              {skills.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deleteCandidate(c.id)}
                              disabled={!isBackendConnected}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Obriši kandidata"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
