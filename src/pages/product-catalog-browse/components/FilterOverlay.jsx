import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterOverlay = ({ isOpen, onClose, filters, onFilterChange, onApplyFilters, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    fragranceType: true,
    gender: true,
    occasion: false,
    priceRange: false,
    brand: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (category, value, checked) => {
    onFilterChange(category, value, checked);
  };

  const filterSections = [
    {
      key: 'fragranceType',
      title: 'Tipo de Fragrância',
      options: [
        { value: 'floral', label: 'Floral', count: 45 },
        { value: 'woody', label: 'Amadeirado', count: 32 },
        { value: 'citrus', label: 'Cítrico', count: 28 },
        { value: 'oriental', label: 'Oriental', count: 24 },
        { value: 'fresh', label: 'Fresco', count: 18 }
      ]
    },
    {
      key: 'gender',
      title: 'Gênero',
      options: [
        { value: 'feminino', label: 'Feminino', count: 89 },
        { value: 'masculino', label: 'Masculino', count: 67 },
        { value: 'unissex', label: 'Unissex', count: 23 }
      ]
    },
    {
      key: 'occasion',
      title: 'Ocasião',
      options: [
        { value: 'dia', label: 'Dia a Dia', count: 56 },
        { value: 'noite', label: 'Noite', count: 43 },
        { value: 'trabalho', label: 'Trabalho', count: 34 },
        { value: 'especial', label: 'Ocasião Especial', count: 29 },
        { value: 'esporte', label: 'Esporte', count: 15 }
      ]
    },
    {
      key: 'priceRange',
      title: 'Faixa de Preço',
      options: [
        { value: '0-100', label: 'Até R$ 100', count: 23 },
        { value: '100-200', label: 'R$ 100 - R$ 200', count: 45 },
        { value: '200-300', label: 'R$ 200 - R$ 300', count: 38 },
        { value: '300-500', label: 'R$ 300 - R$ 500', count: 29 },
        { value: '500+', label: 'Acima de R$ 500', count: 12 }
      ]
    },
    {
      key: 'brand',
      title: 'Marca',
      options: [
        { value: 'chanel', label: 'Chanel', count: 15 },
        { value: 'dior', label: 'Dior', count: 12 },
        { value: 'versace', label: 'Versace', count: 18 },
        { value: 'prada', label: 'Prada', count: 9 },
        { value: 'gucci', label: 'Gucci', count: 14 },
        { value: 'ysl', label: 'Yves Saint Laurent', count: 11 }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <h2 className="font-heading font-semibold text-lg">Filtros</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            Limpar
          </Button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-luxury"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filterSections.map((section) => (
          <div key={section.key} className="space-y-3">
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full text-left p-3 bg-card rounded-lg border border-border"
            >
              <h3 className="font-medium text-foreground">{section.title}</h3>
              <Icon
                name={expandedSections[section.key] ? "ChevronUp" : "ChevronDown"}
                size={16}
                className="text-muted-foreground"
              />
            </button>

            {expandedSections[section.key] && (
              <div className="space-y-3 px-3">
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option.label}
                      checked={filters[section.key]?.includes(option.value) || false}
                      onChange={(e) => handleCheckboxChange(section.key, option.value, e.target.checked)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground ml-2">
                      ({option.count})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card">
        <Button
          onClick={onApplyFilters}
          className="w-full"
          size="lg"
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterOverlay;