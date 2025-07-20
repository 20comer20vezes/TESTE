import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (!activeFilters || activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-card border-b border-border">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Filtros ativos:
      </span>
      
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter)}
            className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-luxury"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      
      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground underline ml-2 transition-luxury"
        >
          Limpar todos
        </button>
      )}
    </div>
  );
};

export default FilterChips;