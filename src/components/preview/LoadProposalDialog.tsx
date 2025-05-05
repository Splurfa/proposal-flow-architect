import React, { useState, useEffect } from 'react';
import { useProposal } from '../../context/ProposalContext';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { getSavedProposals } from '../../utils/supabaseHelpers';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { isSupabaseConnected } from '../../lib/supabase';

interface ProposalListItem {
  id: string;
  title: string;
  date: string;
}

interface LoadProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoadProposalDialog: React.FC<LoadProposalDialogProps> = ({ open, onOpenChange }) => {
  const { loadProposal } = useProposal();
  const { toast } = useToast();
  const [proposals, setProposals] = useState<ProposalListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [loadingProposal, setLoadingProposal] = useState(false);

  useEffect(() => {
    if (open) {
      // Check if Supabase is connected before fetching proposals
      if (!isSupabaseConnected()) {
        toast({
          title: "Supabase not connected",
          description: "Please connect to Supabase first by clicking the Supabase button in the top right corner.",
          variant: "destructive",
        });
        onOpenChange(false);
        return;
      }
      
      fetchProposals();
    }
  }, [open]);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      console.log('Fetching saved proposals...');
      const response = await getSavedProposals();
      
      if (response.isConnectionError) {
        toast({
          title: "Supabase not connected",
          description: "Please connect to Supabase first by clicking the Supabase button in the top right corner.",
          variant: "destructive",
        });
        onOpenChange(false);
        return;
      }
      
      if (response.success) {
        console.log('Fetched proposals:', response.data);
        setProposals(response.data);
      } else {
        console.error('Error fetching proposals:', response.error);
        toast({
          title: "Error loading proposals",
          description: "Could not retrieve your saved proposals.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
      toast({
        title: "Error loading proposals",
        description: "Could not retrieve your saved proposals.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadProposal = async () => {
    if (!selectedProposal) return;
    
    setLoadingProposal(true);
    try {
      await loadProposal(selectedProposal);
      onOpenChange(false);
      toast({
        title: "Proposal loaded",
        description: "Successfully loaded the selected proposal.",
      });
    } catch (error) {
      toast({
        title: "Error loading proposal",
        description: "Could not load the selected proposal.",
        variant: "destructive",
      });
    } finally {
      setLoadingProposal(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Load a Saved Proposal</DialogTitle>
          <DialogDescription>
            Select a previously saved proposal to load.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : proposals.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No saved proposals found. Save a proposal first.
            </p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                {proposals.map((proposal) => (
                  <li 
                    key={proposal.id}
                    className={`
                      p-3 rounded-md cursor-pointer transition-colors
                      ${selectedProposal === proposal.id 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'border border-gray-200 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setSelectedProposal(proposal.id)}
                  >
                    <div className="font-medium">{proposal.title}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(proposal.date)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleLoadProposal} 
            disabled={!selectedProposal || loadingProposal}
          >
            {loadingProposal ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load Selected Proposal'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoadProposalDialog;
