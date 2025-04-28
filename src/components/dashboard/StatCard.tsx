import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeText = "desde o último período",
  isPositive = true
}) => {
  return (
    <div className="card p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}
              <span>
                {change > 0 ? `+${change}` : change} {changeText}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-md bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;