import { Input, TextArea, Typography, Slider, Section, Label, Button, SingleSelect, StackChip } from '@elements';
import { Radio, SearchStackInput } from '@components';
import { Grid, IconButton, Stack as MuiStack } from '@mui/material';
import * as yup from 'yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@libs/query';
import { projectRepository } from '@repositories';
import MinusIcon from '@assets/images/icons/icon-minus.svg';
import { Project, Stack } from '@models';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  purpose: yup.mixed<PurposeType>().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  period: yup.number().required(),
  recruitMember: yup.array().of(
    yup.object({
      job: yup.string().required(),
      number: yup.number().min(1).max(5).required(),
    })
  ),
  leaderJob: yup.mixed<JobType>().required(),
  stacks: yup.array().of(yup.mixed<Stack>().required()).min(0),
});

const maxCompositionLength = 4;
const compositionOptions: { label: string; value: JobType }[] = [
  { label: '프론트엔드', value: 'frontendDeveloper' },
  { label: '백엔드', value: 'backendDeveloper' },
  { label: '디자인', value: 'designer' },
  { label: '기획', value: 'productManager' },
];

const purposeOptions = Project.getPurposeOptions();

function ProjectAddScreen() {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();

  // state, ref, querystring hooks
  // form hooks
  const {
    register,
    handleSubmit,
    getValues,
    control,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      purpose: 'improvement',
      title: '',
      description: '',
      period: 1,
      recruitMember: [{ job: '', number: 0 }],
      stacks: [],
    },
  });

  const {
    fields: recruitMembers,
    remove: removeRecruitMember,
    append: appendRecruitMember,
  } = useFieldArray({
    control,
    name: 'recruitMember',
  });

  const {
    fields: stacks,
    remove: removeStack,
    append: appendStack,
  } = useFieldArray({
    control,
    name: 'stacks',
  });
  // query hooks
  const { mutateAsync: createProject, isLoading } = useMutation(projectRepository.create);
  // calculated values
  // effects
  // handlers
  return (
    <Section css={{ maxWidth: '896px', width: '100%' }}>
      <MuiStack direction='column' spacing={10}>
        <Typography variant='h3'>프로젝트 생성</Typography>
        <MuiStack direction='column' spacing={9}>
          <Controller
            control={control}
            name='purpose'
            render={({ field: { value, onChange } }) => (
              <Radio label='프로젝트 목적' required onChange={onChange} value={value} options={purposeOptions} />
            )}
          />
          <Input
            {...register('title')}
            defaultValue={getValues('title')}
            label='프로젝트 제목'
            required
            placeholder='인적 기술적 자원의 공유 커뮤니티'
            error={errors.title}
            helperText={errors.title?.message}
          />
          <TextArea
            {...register('description')}
            css={{
              height: '288px',
              '&::placeholder': {
                fontSize: '16px',
                lineHeight: '32px',
              },
            }}
            defaultValue={getValues('description')}
            label='프로젝트 설명'
            required
            placeholder={`· 동기 및 타겟층 
  프로젝트를 기획한 배경을 작성해 주세요. 어떤 사용자를 타겟하고 있는지, 기획한 서비스만의 차별점 및 
  매력은 무엇인지 설명해주세요! 
· 진행 방식 
  회의와 모임 장소 및 주기, 협업 방식에 대해 설명해주세요. 
· 달성하고 싶은 목표 
  프로젝트를 통해 달성하고 싶은 목표와 마일스톤 및 일정이 있다면 설명해주세요. 팀원들과 함께 만들어가
  고 싶다면 해당 내용을 작성해주세요.`}
            error={errors.description}
          />
          <Controller
            control={control}
            name='period'
            render={({ field: { value, onChange } }) => (
              <Slider
                label='에상 기간'
                required
                min={1}
                max={12}
                step={1}
                value={value}
                onChange={onChange}
                marks={[
                  { label: '1개월 이하', value: 1 },
                  { label: '2개월', value: 2 },
                  { label: '3개월', value: 3 },
                  { label: '4개월', value: 4 },
                  { label: '5개월', value: 5 },
                  { label: '6개월', value: 6 },
                  { label: '7개월', value: 7 },
                  { label: '8개월', value: 8 },
                  { label: '9개월', value: 9 },
                  { label: '10개월', value: 10 },
                  { label: '11개월', value: 11 },
                  { label: '1년', value: 12 },
                ]}
              />
            )}
          />
          <MuiStack direction='column' spacing={4}>
            <MuiStack direction='row' justifyContent='space-between' alignItems='center'>
              <Label css={{ marginBottom: 0 }} id='RecruitMember' label='멤버 구성' required />
              <Button
                css={{
                  fontWeight: 700,
                  fontSize: '16px',
                }}
                onClick={() => appendRecruitMember({ job: '', number: 0 })}
                disabled={maxCompositionLength <= recruitMembers.length}
              >
                추가
              </Button>
            </MuiStack>
            <hr css={{ border: '1px solid #000' }} />
            <Controller
              control={control}
              name={`leaderJob`}
              render={({ field: { value, onChange } }) => (
                <SingleSelect
                  placeholder='리더 직무 선택'
                  css={{ width: '326px' }}
                  value={value}
                  onChange={onChange}
                  options={compositionOptions}
                />
              )}
            />

            {recruitMembers.map((member, idx) => (
              <MuiStack key={member.id} direction='row' justifyContent='space-between'>
                <MuiStack direction='row' spacing={4}>
                  <Controller
                    control={control}
                    name={`recruitMember.${idx}.job`}
                    render={({ field: { value, onChange } }) => {
                      const selectedMap: { [key: string]: number } = {};
                      watch(`recruitMember`)?.forEach((member, i) => {
                        selectedMap[member.job] = i;
                      });
                      const options = compositionOptions.filter(
                        //NOTE: index는 0일 수 있기때문에 undefined를 조건으로해야한다.
                        (option) => selectedMap[option.value] === idx || selectedMap[option.value] === undefined
                      );

                      return (
                        <SingleSelect
                          css={{ width: '326px' }}
                          onChange={onChange}
                          placeholder='직무 선택'
                          value={value}
                          options={options}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name={`recruitMember.${idx}.number`}
                    render={({ field: { value, onChange } }) => (
                      <SingleSelect
                        css={{ width: '326px' }}
                        placeholder='인원 수'
                        value={value}
                        onChange={onChange}
                        options={[
                          { label: '1', value: 1 },
                          { label: '2', value: 2 },
                          { label: '3', value: 3 },
                          { label: '4', value: 4 },
                          { label: '5', value: 5 },
                        ]}
                      />
                    )}
                  />
                </MuiStack>
                {recruitMembers.length !== 1 && (
                  <IconButton onClick={() => removeRecruitMember(idx)}>
                    <MinusIcon css={{ width: '20px' }} />
                  </IconButton>
                )}
              </MuiStack>
            ))}
          </MuiStack>
          {/* HACK: spacing을 주지 않으면 그 아래 grid container의 rowSpacing이 안먹고 주면 먹어서 이렇게했다.. */}
          <MuiStack direction='column' spacing='0px'>
            <Controller
              control={control}
              name='stacks'
              render={({ field: { value, onChange } }) => (
                <SearchStackInput
                  type='project'
                  label='기술 스택'
                  required
                  value={value}
                  onAdd={appendStack}
                  onChange={onChange}
                />
              )}
            />
            <Grid container columnSpacing='4px' rowSpacing='8px'>
              {stacks.map((stack, idx) => (
                <Grid item key={stack.id}>
                  <StackChip
                    key={stack.id}
                    selected
                    name={stack.name}
                    length={Stack.getLength(stack.name)}
                    onClick={() => removeStack(idx)}
                  />
                </Grid>
              ))}
            </Grid>
          </MuiStack>
        </MuiStack>
      </MuiStack>
      <MuiStack direction='row' spacing='16px' justifyContent='flex-end' css={{ marginTop: '60px' }}>
        <Button css={{ width: '98px', height: '48px' }}>임시 저장</Button>
        <Button
          variant='filled'
          loading={isLoading}
          onClick={handleSubmit(async ({ title, description, period, purpose, recruitMember, stacks, leaderJob }) => {
            await createProject(
              {
                title,
                description,
                period,
                purpose,
                stacks: stacks?.map(({ id }) => id) ?? [],
                leaderJob,
                recruitMember: {
                  frontendDeveloper: recruitMember?.find((member) => member.job === 'frontendDeveloper')?.number ?? 0,
                  backendDeveloper: recruitMember?.find((member) => member.job === 'backendDeveloper')?.number ?? 0,
                  designer: recruitMember?.find((member) => member.job === 'designer')?.number ?? 0,
                  productManager: recruitMember?.find((member) => member.job === 'productManager')?.number ?? 0,
                },
              },
              {
                onSuccess: () => navigate('/projects'),
              }
            );
          })}
          css={{ width: '212px', height: '48px' }}
          disabled={!isValid || !isDirty}
        >
          등록
        </Button>
      </MuiStack>
    </Section>
  );
}

export { ProjectAddScreen };
