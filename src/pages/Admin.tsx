import React from 'react';
import { motion } from 'framer-motion';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  AlertCircle,
  CalendarPlus,
} from 'lucide-react';
import Dialog from '../components/ui/Dialog';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { AppData, Contestant, Season } from '../types';

interface AdminProps {
  data: AppData;
  onDataChange: (newData: AppData) => void;
}

const contestantSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(16, 'Must be at least 16 years old').max(100),
  imageUrl: z.string().url('Must be a valid URL'),
  skill: z.string().min(2, 'Skill must be at least 2 characters'),
  socialLinks: z.object({
    instagram: z.string(),
    twitter: z.string(),
  }),
  status: z.enum(['active', 'exited', 'disqualified', 'winner']),
});

const seasonSchema = z.object({
  id: z.number(),
  theme: z.string().min(2, 'Theme must be at least 2 characters'),
  year: z.number().min(2020).max(2030),
  contestants: z.array(contestantSchema).default([]),
});

type ContestantFormData = z.infer<typeof contestantSchema>;
type SeasonFormData = z.infer<typeof seasonSchema>;

const columnHelper = createColumnHelper<Contestant>();

const Admin: React.FC<AdminProps> = ({ data, onDataChange }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedSeason, setSelectedSeason] = React.useState<Season>(data.seasons[0]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isAddSeasonDialogOpen, setIsAddSeasonDialogOpen] = React.useState(false);
  const [selectedContestant, setSelectedContestant] = React.useState<Contestant | null>(null);

  const {
    register: registerContestant,
    handleSubmit: handleSubmitContestant,
    reset: resetContestant,
    formState: { errors: contestantErrors },
  } = useForm<ContestantFormData>({
    resolver: zodResolver(contestantSchema),
  });

  const {
    register: registerSeason,
    handleSubmit: handleSubmitSeason,
    reset: resetSeason,
    formState: { errors: seasonErrors },
  } = useForm<SeasonFormData>({
    resolver: zodResolver(seasonSchema),
    defaultValues: {
      contestants: [],
    },
  });

  const columns = [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),
    columnHelper.accessor('age', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    }),
    columnHelper.accessor('skill', {
      header: 'Skill',
    }),
    columnHelper.accessor('status', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const statusStyles = {
          active: 'bg-green-500/20 text-green-400',
          winner: 'bg-yellow-500/20 text-yellow-400',
          exited: 'bg-gray-500/20 text-gray-400',
          disqualified: 'bg-red-500/20 text-red-400',
        };

        return (
          <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[status]}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: selectedSeason.contestants,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleAdd = () => {
    setSelectedContestant(null);
    resetContestant({
      id: '',
      name: '',
      age: 18,
      imageUrl: '',
      skill: '',
      socialLinks: {
        instagram: '',
        twitter: '',
      },
      status: 'active',
    });
    setIsAddDialogOpen(true);
  };

  const handleAddSeason = () => {
    resetSeason({
      id: data.seasons.length + 1,
      theme: '',
      year: new Date().getFullYear(),
      contestants: [],
    });
    setIsAddSeasonDialogOpen(true);
  };

  const handleEdit = (contestant: Contestant) => {
    setSelectedContestant(contestant);
    resetContestant(contestant);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (contestant: Contestant) => {
    setSelectedContestant(contestant);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitContestant = (formData: ContestantFormData) => {
    const newData = { ...data };
    const seasonIndex = newData.seasons.findIndex(s => s.id === selectedSeason.id);

    if (isAddDialogOpen) {
      newData.seasons[seasonIndex].contestants.push(formData);
      toast.success('Contestant added successfully');
    } else if (isEditDialogOpen && selectedContestant) {
      const contestantIndex = newData.seasons[seasonIndex].contestants.findIndex(
        c => c.id === selectedContestant.id
      );
      newData.seasons[seasonIndex].contestants[contestantIndex] = formData;
      toast.success('Contestant updated successfully');
    }

    onDataChange(newData);
    setSelectedSeason(newData.seasons[seasonIndex]);
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    resetContestant();
  };

  const onSubmitSeason = (formData: SeasonFormData) => {
    const newData = { ...data };
    newData.seasons.push(formData);
    onDataChange(newData);
    setSelectedSeason(formData);
    setIsAddSeasonDialogOpen(false);
    toast.success('Season added successfully');
  };

  const handleConfirmDelete = () => {
    if (selectedContestant) {
      const newData = { ...data };
      const seasonIndex = newData.seasons.findIndex(s => s.id === selectedSeason.id);
      newData.seasons[seasonIndex].contestants = newData.seasons[seasonIndex].contestants.filter(
        c => c.id !== selectedContestant.id
      );
      onDataChange(newData);
      setSelectedSeason(newData.seasons[seasonIndex]);
      setIsDeleteDialogOpen(false);
      toast.success('Contestant deleted successfully');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-400">
          Manage contestants and seasons for Fame Forge
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedSeason.id}
              onChange={(e) => {
                const season = data.seasons.find(s => s.id === Number(e.target.value));
                if (season) setSelectedSeason(season);
              }}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {data.seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.theme} ({season.year})
                </option>
              ))}
            </select>
            <Button onClick={handleAddSeason} variant="secondary">
              <CalendarPlus className="h-5 w-5 mr-2" />
              Add Season
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search contestants..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-5 w-5 mr-2" />
            Add Contestant
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left py-3 px-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-700 hover:bg-gray-700/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-400"
                  >
                    No contestants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-400">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Season Dialog */}
      <Dialog
        isOpen={isAddSeasonDialogOpen}
        onClose={() => {
          setIsAddSeasonDialogOpen(false);
          resetSeason();
        }}
        title="Add New Season"
      >
        <form onSubmit={handleSubmitSeason(onSubmitSeason)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <Input
                {...registerSeason('theme')}
                error={seasonErrors.theme?.message}
                placeholder="Enter season theme"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <Input
                type="number"
                {...registerSeason('year', { valueAsNumber: true })}
                error={seasonErrors.year?.message}
                placeholder="Enter year"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsAddSeasonDialogOpen(false);
                resetSeason();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Season
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Add/Edit Contestant Dialog */}
      <Dialog
        isOpen={isAddDialogOpen || isEditDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
          resetContestant();
        }}
        title={isAddDialogOpen ? 'Add Contestant' : 'Edit Contestant'}
      >
        <form onSubmit={handleSubmitContestant(onSubmitContestant)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                {...registerContestant('name')}
                error={contestantErrors.name?.message}
                placeholder="Enter contestant name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <Input
                type="number"
                {...registerContestant('age', { valueAsNumber: true })}
                error={contestantErrors.age?.message}
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                {...registerContestant('imageUrl')}
                error={contestantErrors.imageUrl?.message}
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Skill</label>
              <Input
                {...registerContestant('skill')}
                error={contestantErrors.skill?.message}
                placeholder="Enter contestant's skill"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <Input
                {...registerContestant('socialLinks.instagram')}
                error={contestantErrors.socialLinks?.instagram?.message}
                placeholder="Enter Instagram username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <Input
                {...registerContestant('socialLinks.twitter')}
                error={contestantErrors.socialLinks?.twitter?.message}
                placeholder="Enter Twitter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                {...registerContestant('status')}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="active">Active</option>
                <option value="winner">Winner</option>
                <option value="exited">Exited</option>
                <option value="disqualified">Disqualified</option>
              </select>
              {contestantErrors.status?.message && (
                <p className="text-sm text-red-500 mt-1">{contestantErrors.status.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsAddDialogOpen(false);
                setIsEditDialogOpen(false);
                resetContestant();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isAddDialogOpen ? 'Add Contestant' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Contestant"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-red-400">
            <AlertCircle className="h-6 w-6" />
            <p>Are you sure you want to delete this contestant?</p>
          </div>
          <p className="text-gray-400">
            This action cannot be undone. The contestant will be permanently removed from the system.
          </p>
          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default Admin;