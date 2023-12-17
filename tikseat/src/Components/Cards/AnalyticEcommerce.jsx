import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from './MainCard';

// assets
// import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, bgColor, title, count, percentage, isLoss, extra }) => (
  <MainCard sx={{background: bgColor, color:"#fff"}}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="#fff">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="#fff">
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="combined"
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1, color:"#fff" }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="#fff">
        You made an extra{' '}
        <Typography component="span" variant="caption">
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Box>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  // color: 'primary'
};

export default AnalyticEcommerce;