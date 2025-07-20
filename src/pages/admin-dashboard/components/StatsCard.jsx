import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendUp, description }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-luxury">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              trendUp ? 'text-success' : 'text-error'
            }`}>
              <Icon name={trendUp ? 'TrendingUp' : 'TrendingDown'} size={12} />
              <span>{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;