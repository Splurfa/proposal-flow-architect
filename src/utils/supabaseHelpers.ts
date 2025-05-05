
import { supabase } from '../lib/supabase';
import { ProposalState } from '../types';

/**
 * Save a proposal to the database
 * @param proposal The proposal data to save
 * @returns The saved proposal ID
 */
export const saveProposalToDatabase = async (proposal: any) => {
  try {
    if (!supabase) {
      return {
        success: false,
        error: new Error('Supabase not connected. Please connect to Supabase first.'),
        isConnectionError: true
      };
    }
    
    // Add timestamp for when the proposal was saved
    const dataToSave = {
      proposalTitle: proposal.proposalTitle || 'Untitled Proposal',
      updated_at: new Date().toISOString(),
      data: proposal // Store the entire proposal as JSON
    };
    
    // If the proposal has an id, update it, otherwise insert a new one
    if (proposal.id) {
      const { data, error } = await supabase
        .from('proposals')
        .update(dataToSave)
        .eq('id', proposal.id)
        .select();
      
      if (error) throw error;
      
      return {
        id: data?.[0]?.id || proposal.id,
        success: true
      };
    } else {
      // Insert a new proposal
      const { data, error } = await supabase
        .from('proposals')
        .insert([dataToSave])
        .select();
      
      if (error) throw error;
      
      return {
        id: data?.[0]?.id,
        success: true
      };
    }
  } catch (error) {
    console.error('Error saving proposal:', error);
    return {
      success: false,
      error
    };
  }
};

/**
 * Load a proposal from the database
 * @param id The ID of the proposal to load
 * @returns The loaded proposal data
 */
export const loadProposalFromDatabase = async (id: string) => {
  try {
    if (!supabase) {
      return {
        success: false,
        error: new Error('Supabase not connected. Please connect to Supabase first.'),
        isConnectionError: true
      };
    }
    
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    // The actual proposal content is stored in the data field
    return {
      success: true,
      data: data?.data || data
    };
  } catch (error) {
    console.error('Error loading proposal:', error);
    return {
      success: false,
      error
    };
  }
};

/**
 * Get a list of saved proposals
 * @returns Array of saved proposals
 */
export const getSavedProposals = async () => {
  try {
    if (!supabase) {
      return {
        success: false,
        error: new Error('Supabase not connected. Please connect to Supabase first.'),
        isConnectionError: true,
        data: []
      };
    }
    
    const { data, error } = await supabase
      .from('proposals')
      .select('id, proposalTitle, updated_at')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    
    return {
      success: true,
      data: data?.map(item => ({
        id: item.id,
        title: item.proposalTitle || 'Untitled Proposal',
        date: item.updated_at
      })) || []
    };
  } catch (error) {
    console.error('Error getting saved proposals:', error);
    return {
      success: false,
      error,
      data: []
    };
  }
};
