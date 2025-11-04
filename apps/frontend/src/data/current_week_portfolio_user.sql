-- Function to get current week's portfolio for a user
CREATE OR REPLACE FUNCTION get_current_portfolio(p_user_id UUID)
RETURNS TABLE (
  portfolio_id UUID,
  artist_id UUID,
  artist_name VARCHAR,
  score DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.id,
    a.id,
    a.name,
    a.score
  FROM user_portfolios up
  JOIN portfolio_artists pa ON up.id = pa.portfolio_id
  JOIN artists a ON pa.artist_id = a.id
  WHERE up.user_id = p_user_id
  AND up.week_starting = date_trunc('week', CURRENT_DATE)::DATE;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user rank
CREATE OR REPLACE FUNCTION update_user_ranks()
RETURNS void AS $$
BEGIN
  WITH ranked_users AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (ORDER BY lifetime_earnings DESC) as new_rank
    FROM users
  )
  UPDATE users u
  SET rank = ru.new_rank
  FROM ranked_users ru
  WHERE u.id = ru.id;
END;
$$ LANGUAGE plpgsql;